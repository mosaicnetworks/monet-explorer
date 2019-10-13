""" Core models for Monet Explorer """

from django.db import models


class Network(models.Model):
    """ Network model """

    class Meta:
        unique_together = ['name']

    name = models.CharField(max_length=40)
    host = models.CharField(max_length=100)
    port = models.IntegerField()

    def __str__(self):
        return self.name


class Validator(models.Model):
    """ Validator model """

    class Meta:
        unique_together = ['public_key', 'network']

    host = models.CharField(max_length=100)
    port = models.IntegerField()
    public_key = models.CharField(max_length=132)
    moniker = models.CharField(max_length=30)

    # Relational fields
    network = models.ForeignKey(Network, on_delete=models.CASCADE)

    def __str__(self):
        return self.moniker


class Info(models.Model):
    """ Info model """

    class Meta:
        unique_together = ['validator']

    e_id = models.IntegerField()

    type = models.CharField(max_length=30)
    state = models.CharField(max_length=50)

    consensus_events = models.IntegerField()
    consensus_transactions = models.IntegerField()
    last_block_index = models.IntegerField()
    last_consensus_round = models.IntegerField()
    last_peer_change = models.IntegerField()
    min_gas_price = models.IntegerField()
    num_peers = models.IntegerField()
    undetermined_events = models.IntegerField()
    transaction_pool = models.IntegerField()

    sync_rate = models.DecimalField(max_digits=50, decimal_places=4)
    events_per_second = models.DecimalField(max_digits=50, decimal_places=4)
    rounds_per_second = models.DecimalField(max_digits=50, decimal_places=4)

    # Relational Fields
    validator = models.ForeignKey(Validator, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.validator.moniker} - {self.type}'


class Block(models.Model):
    """ Info model """

    class Meta:
        unique_together = ['index', 'network']

    index = models.IntegerField()
    round_received = models.IntegerField()

    state_hash = models.CharField(max_length=44)
    peers_hash = models.CharField(max_length=44)
    frame_hash = models.CharField(max_length=44)

    # Relational fields
    network = models.ForeignKey(Network, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.network.name} - {self.index}'


class Transaction(models.Model):
    """ Transaction model """

    data = models.TextField()

    # Relational fields
    block = models.ForeignKey(Block, on_delete=models.CASCADE)


class InternalTransaction(models.Model):
    """ Internal Transaction model """

    data = models.TextField()

    # Relational fields
    block = models.ForeignKey(Block, on_delete=models.CASCADE)


class InternalTransactionReceipt(models.Model):
    """ Internal Transaction Receipt model """

    data = models.TextField()

    # Relational fields
    block = models.ForeignKey(Block, on_delete=models.CASCADE)


class Signature(models.Model):
    """ Signature model """

    signature = models.TextField()

    # Relational Fields
    validator = models.ForeignKey(Validator, on_delete=models.CASCADE)
    block = models.ForeignKey(Block, on_delete=models.CASCADE)
