from rest_framework import serializers

from authentication.serializers import Account
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    # Author is taken from Account model and serializer
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Post

        fields = ('id', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        # We exclude author field from validation
        exclusions = super().get_validation_exclusions()

        return exclusions + ['author']
