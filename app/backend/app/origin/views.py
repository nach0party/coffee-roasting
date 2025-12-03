from app.shared.viewsets import CoffeeRoastingModelViewSet
from app.origin.models.origin import Origin
from app.origin.serializers import OriginSerializer


class OriginViewSet(CoffeeRoastingModelViewSet):

    queryset = Origin.objects.all()
    serializer_class = OriginSerializer
