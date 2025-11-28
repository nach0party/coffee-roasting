from rest_framework.viewsets import ModelViewSet
from app.origin.models.origin import Origin
from app.origin.serializers import OriginSerializer


class OriginViewSet(ModelViewSet):

    queryset = Origin.objects.all()
    serializer_class = OriginSerializer
