from django.db import models


class TimeStampMixin(models.Model):
    """
    Abstract model mixin that provides some timestamp information.
    """

    created_when = models.DateTimeField()
    updated_when = models.DateTimeField()
    deleted_when = models.DateTimeField()

    class Meta:
        abstract = True
