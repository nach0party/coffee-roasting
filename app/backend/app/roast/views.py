from rest_framework.viewsets import ModelViewSet
from app.roast.models.roast import Roast
from app.roast.models.roast_event import RoastEvent
from app.roast.serializers import RoastSerializer, RoastEventSerializer


class RoastViewSet(ModelViewSet):
    """
    Provides endpoints for a `roast` aka
    the concept of roasting beans.
    """

    queryset = Roast.objects.all()
    serializer_class = RoastSerializer


class RoastEventViewSet(ModelViewSet):
    """
    Provides endpoints for a roast event, tied to a roast
    that explains that a certain type of event happened over
    the course of a certain time period.
    """

    queryset = RoastEvent.objects.all()
    serializer_class = RoastEventSerializer
