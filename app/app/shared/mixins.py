from django.db import models


class TimeStampMixin(models.Model):
    """
    Abstract model mixin that provides some timestamp information.
    """

    created_when = models.DateTimeField(auto_now_add=True)
    updated_when = models.DateTimeField(auto_now=True)
    deleted_when = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True
