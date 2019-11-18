""" Admin for downloads app """

from django.contrib import admin

from . import models


class ApplicationAdmin(admin.ModelAdmin):
    """ Admin config for Apllication model """

    list_display = ('id', 'owner', 'repository_name', 'description')


def _register(model, admin_class):
    admin.site.register(model, admin_class)


_register(models.Application, ApplicationAdmin)
