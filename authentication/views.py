import json

from django.contrib.auth import authenticate, login

from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer


# ModelViewSet offers an interface for
# listing, creating, retrieving, updating and destroying objects of a given model
class AccountViewSet(viewsets.ModelViewSet):

    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(), )

        # Any user is able to create a new account
        if self.request.method == 'POST':
            return (permissions.AllowAny(), )

        # Only the owner of the account is capable of updating account values
        return (permissions.IsAuthenticated(), IsAccountOwner(), )

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            # By default User object is saved as is which is not
            # a great decision in terms of security
            Account.objects.create_user(**serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created.'
        }, status=status.HTTP_400_BAD_REQUEST)


# APIView is made to handle AJAX requests.
class LoginView(views.APIView):

    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                        'status': 'Unauthorized',
                        'message': 'Account is disabled.'
                    }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                    'status': 'Unauthorized',
                    'message': 'Invalid username/password combination.'
                }, status=status.HTTP_401_UNAUTHORIZED)
