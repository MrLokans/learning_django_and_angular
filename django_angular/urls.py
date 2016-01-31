from django.conf.urls import url, include

from django_angular.views import IndexView

from rest_framework import routers
from authentication.views import AccountViewSet, LoginView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)


urlpatterns = [
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^$', IndexView.as_view(), name="index")
]
