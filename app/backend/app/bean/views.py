from rest_framework.viewsets import ModelViewSet
from app.bean.models import Bean
from app.bean.serializers import BeanReadSerializer, BeanUpsertDeleteSerializer


class BeansViewSet(ModelViewSet):
    """
    For Tracking the different possible types
    of beans that can be roasted.
    """

    queryset = Bean.objects.all()

    def get_serializer_class(self):
        if self.action in ["retrieve", "list"]:
            return BeanReadSerializer
        return BeanUpsertDeleteSerializer
