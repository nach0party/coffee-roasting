from rest_framework.routers import DefaultRouter
from app.roast.views import RoastViewSet, RoastEventViewSet, RoastProfileViewSet

router = DefaultRouter(trailing_slash=False)

router.register(r"roasts/profiles", RoastProfileViewSet, basename="roasts/profiles")
router.register(r"roasts/events", RoastEventViewSet, basename="roasts/events")
router.register(r"roasts", RoastViewSet, basename="roasts")
urlpatterns = router.urls
