""" Models for downloads app """

from django.db import models


class Application(models.Model):
    """ Application model """

    owner = models.CharField(max_length=30, default="mosaicnetworks")
    repository_name = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.owner}/{self.repository_name}'
