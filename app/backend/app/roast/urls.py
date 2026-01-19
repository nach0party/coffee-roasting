from rest_framework.routers import DefaultRouter
from app.roast.views import (
    RoastViewSet,
    RoastEventViewSet,
    RoastProfileViewSet,
    RoastProfileFlavorsViewSet,
    RoastFlavorsViewSet,
)

router = DefaultRouter(trailing_slash=False)

router.register(
    r"roasts/profiles/flavors", RoastProfileFlavorsViewSet, basename="roasts/profiles/flavors"
)
router.register(r"roasts/flavors", RoastFlavorsViewSet, basename="roasts/flavors")
router.register(r"roasts/profiles", RoastProfileViewSet, basename="roasts/profiles")
router.register(r"roasts/events", RoastEventViewSet, basename="roasts/events")
router.register(r"roasts", RoastViewSet, basename="roasts")
urlpatterns = router.urls
