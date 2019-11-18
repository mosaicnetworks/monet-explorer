""" Serializers for downloads """

from rest_framework.serializers import ModelSerializer

from .models import Application


class ApplicationSerializer(ModelSerializer):
    """ Release serializer  """

    class Meta:
        model = Application
        fields = ['id', 'owner', 'repository_name', 'description']
