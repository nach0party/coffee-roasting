from typing import cast

from django.db import transaction

from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from app.roast.models.roast import Roast
from app.roast.models.roast_event import RoastEvent
from app.roast.serializers import RoastSerializer, RoastEventSerializer
from app.shared.viewsets import CoffeeRoastingModelViewSet


class RoastViewSet(CoffeeRoastingModelViewSet):
    """
    Provides endpoints for a `roast` aka
    the concept of roasting beans.
    """

    queryset = Roast.objects.all()
    serializer_class = RoastSerializer

    @transaction.atomic()
    @action(methods=["post"], detail=True)
    def begin(self, request: Request, pk: str | None = None) -> Response:
        """
        When we `begin` a roast, we do a things like:
            1. Start the counter (when did it start)
            2. Create the first event indicating things have begun
                - We also make sure that event is the start type
        """
        roast = cast(Roast, self.get_object())
        event = RoastEvent()

        start_time = timezone.now()
        print(roast, "roast")
        return Response("yay")


class RoastEventViewSet(CoffeeRoastingModelViewSet):
    """
    Provides endpoints for a roast event, tied to a roast
    that explains that a certain type of event happened over
    the course of a certain time period.
    """

    queryset = RoastEvent.objects.all()
    serializer_class = RoastEventSerializer
    filterset_fields = (
        "roast",
        "type",
    )
