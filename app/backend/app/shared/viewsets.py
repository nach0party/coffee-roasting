from django.utils import timezone
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend


class CoffeeRoastingModelViewSet(ModelViewSet):
    """
    Provides some filterset class injection and whatever
    custom logic we want applied to all model viewsets.
    """

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
