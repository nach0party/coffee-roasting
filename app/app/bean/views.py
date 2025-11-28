from rest_framework.viewsets import ModelViewSet
from app.bean.models import Bean
from app.bean.serializers import BeanSerializer


class BeansViewSet(ModelViewSet):
    """
    For Tracking the different possible types
    of beans that can be roasted.
    """

    queryset = Bean.objects.all()
    serializer_class = BeanSerializer
