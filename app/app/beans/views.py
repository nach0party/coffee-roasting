from rest_framework.viewsets import ModelViewSet
from app.beans.models import Beans
from app.beans.serializers import BeanSerializer


class BeansViewSet(ModelViewSet):
    """
    For Tracking the
    """

    queryset = Beans.objects.all()
    serializer_class = BeanSerializer
