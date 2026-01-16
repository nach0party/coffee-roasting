from typing import cast

from django.db import transaction
from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from app.roast.models.roast import Roast
from app.roast.models.roast_event import RoastEvent
from app.roast.serializers import (
    RoastSerializer,
    RoastEventSerializer,
    RetrieveListRoastSerializer,
    RoastProfileSerializer,
)
from app.roast.filters import RoastFilter
from app.roast.models.roast_profile import RoastProfile

from app.shared.viewsets import CoffeeRoastingModelViewSet


class RoastViewSet(CoffeeRoastingModelViewSet):
    """
    Provides endpoints for a `roast` aka
    the concept of roasting beans.
    """

    queryset = Roast.objects.prefetch_related("roast_event").filter(deleted_when=None)
    filterset_class = RoastFilter

    def get_serializer_class(self):
        if self.action in ["retrieve", "list"]:
            return RetrieveListRoastSerializer
        return RoastSerializer

    # def create(self, request, *args, **kwargs):
    #     print(request, "request")
    #     print(args, "args")
    #     print(kwargs, "kwargs")
    #     return super().create(request, *args, **kwargs)

    # TODO should we be removing this?
    @transaction.atomic()
    @action(methods=["post"], detail=True)
    def begin(self, request: Request, pk: str | None = None) -> Response:
        """
        When we `begin` a roast, we do a things like:
            1. Start the counter (when did it start)
            2. Create the first event indicating things have begun
                - We also make sure that event is the start type
            3. Create the second event, which is that the dry phase has begun
        """
        roast = cast(Roast, self.get_object())
        if roast.started_when:
            raise ValidationError({"started_when": ["Roast has already started"]})

        roast.started_when = timezone.now()

        event = RoastEvent()
        event.roast = roast
        event.type = RoastEvent.Type.BEGIN.value

        roast.save()
        event.save()

        # make this a setting, and optional
        dry_phase = RoastEvent()
        dry_phase.roast = roast
        dry_phase.started_when = timezone.now()
        dry_phase.type = RoastEvent.Type.DRY_PHASE_START.value
        dry_phase.save()

        return Response(RetrieveListRoastSerializer(roast).data, status=status.HTTP_202_ACCEPTED)

    @transaction.atomic()
    @action(methods=["post"], detail=True)
    def end(self, request: Request, pk: str | None = None) -> Response:
        """
        When we `end` a roast, we do a things like:
            1. Essentially we end the roast
            2. Create the last event indicating things have finally completed,
                - We've dropped the roast
                - We also make sure that event is the correct start type
        """
        roast = cast(Roast, self.get_object())
        if not roast.started_when:
            raise ValidationError({"started_when": ["Roast has not yet started"]})
        if roast.ended_when:
            raise ValidationError({"ended_when": ["Roast has already been"]})

        roast.ended_when = timezone.now()

        event = RoastEvent()
        event.roast = roast
        event.type = RoastEvent.Type.DROP.value
        roast.save()
        event.save()

        return Response(RetrieveListRoastSerializer(roast).data, status=status.HTTP_202_ACCEPTED)


class RoastEventViewSet(CoffeeRoastingModelViewSet):
    """
    Provides endpoints for a roast event, tied to a roast
    that explains that a certain type of event happened over
    the course of a certain time period.
    """

    queryset = RoastEvent.objects.filter(deleted_when=None)
    serializer_class = RoastEventSerializer
    filterset_fields = (
        "roast",
        "type",
    )


class RoastProfileViewSet(CoffeeRoastingModelViewSet):
    """
    Provides endpoints for the roast profiles, some information
    to gauge how the coffee tastes / smells / and other relative attributes.
    """

    queryset = RoastProfile.objects.filter(deleted_when=None)
    serializer_class = RoastProfileSerializer
    filterset_fields = ("roast",)
