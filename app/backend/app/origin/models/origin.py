from uuid import uuid4
from typing import Iterable

from pycountry import countries
from django.db import models
from rest_framework.exceptions import ValidationError

from app.shared.mixins import TimeStampMixin


class Origin(TimeStampMixin):
    """
    The unique places where a bean might come from.

    Region / Municipality is a better compromise that state / city /
    town since most beans are sourced outside of the US

    TODO pre-population would be nice...
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    country = models.CharField(
        max_length=255,
        choices=[(country.name, country.name) for country in countries],
        help_text="The country of origin of the bean",
    )
    region = models.CharField(
        max_length=255, null=True, blank=True, help_text="Essentially the US concept of a `state`"
    )
    municipality = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="Essentially the US concept of a `town` or `city`",
    )

    class Meta:
        db_table = "origins"
        ordering = ["-created_when"]

    def save(self, *args, **kwargs) -> None:
        if (
            Origin.objects.filter(
                country=self.country, region=self.region, municipality=self.municipality
            )
            .exclude(id=self.id)
            .exists()
        ):
            raise ValidationError({"non_field_errors": ["This Origin already exists"]})
        return super().save(*args, **kwargs)
