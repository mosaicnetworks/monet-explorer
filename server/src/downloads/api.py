""" API endpoints for Downloads App """

from rest_framework import generics

from .models import Application
from .serializers import ApplicationSerializer


class ApplicationListAPIHandler(generics.ListAPIView):
    """
    A ViewSet for listing Aplications
    """

    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
