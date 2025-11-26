from uuid import uuid4
from django.db import models


class Beans(models.Model):
    """
    Represents the concept of a bean type.
    Where did it come from?
    What did it cost?
    Country of origin, anything people who roast care about more or less...
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    class Meta:
        db_table = "beans"
