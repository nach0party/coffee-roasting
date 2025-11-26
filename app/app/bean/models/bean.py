from uuid import uuid4
from django.db import models
from pycountry import countries
from app.shared.mixins import TimeStampMixin


class Bean(TimeStampMixin):
    """
    Represents the concept of a bean type.
    Where did it come from?
    What did it cost?
    Country of origin, anything people who roast care about more or less...
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    country = models.CharField(
        choices=[(country.name, country.name) for country in countries],
        help_text="Valid countries beans can be sourced from.",
    )

    class Meta:
        db_table = "beans"
