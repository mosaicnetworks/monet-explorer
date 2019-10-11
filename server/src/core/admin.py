""" Monet Explorer Admin """

from django.contrib import admin

from . import models

admin.site.site_header = 'Monet Explorer'


class NetworkAdmin(admin.ModelAdmin):
    """ Admin config for Network model """

    list_display = ('id', 'name', 'host', 'port')


class ValidatorAdmin(admin.ModelAdmin):
    """ Admin config for Validator model """

    list_display = ('id', 'network', 'moniker', 'host', 'port', 'public_key')


class InfoAdmin(admin.ModelAdmin):
    """ Admin config for Info model """

    list_display = ('id', 'validator', 'e_id', 'type', 'state',
                    'consensus_events', 'consensus_transactions',
                    'last_block_index', 'last_consensus_round',
                    'last_peer_change', 'min_gas_price', 'num_peers',
                    'undetermined_events', 'transaction_pool', 'sync_rate',
                    'events_per_second', 'rounds_per_second')


def _register(model, admin_class):
    admin.site.register(model, admin_class)


_register(models.Validator, ValidatorAdmin)
_register(models.Network, NetworkAdmin)
_register(models.Info, InfoAdmin)
