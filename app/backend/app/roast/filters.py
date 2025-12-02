from datetime import datetime
from django.db.models import QuerySet, Q
from django_filters import FilterSet, BooleanFilter
from app.roast.models.roast import Roast


class RoastFilter(FilterSet):
    """
    Provides some nice filterable information for the roast itself.
    """

    has_begun = BooleanFilter(method="has_roast_begun")

    def has_roast_begun(
        self, queryset: QuerySet[Roast], name: str, value: datetime | None
    ) -> QuerySet:
        if value:
            return queryset.filter(Q(started_when__isnull=False))
        else:
            return queryset.filter(Q(started_when__isnull=True))

    class Meta:
        model = Roast
        fields = ["has_begun"]
