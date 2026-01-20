from app.bean.models import Bean
from app.roast.models.roast_profile_flavors import RoastProfileFlavors
from ..utils import transform_roast_flavor_profiles


class BeanRoastProfileAnalysis:
    """
    Gives us a breakdown of a one beans total roast profile
    and some analytical data to provide our graphs.

    TODO make flexible, maybe allow different breakdowns / data formats
    TODO maybe this should just live in the app that it's most relevant towards?
    """

    __bean: Bean
    # TODO do we care about roast level? maybe we don't want medium / dark to interfere with the analytics

    class CannotRunAnalytics(Exception):
        """
        Docstring for DeletedBean
        """

    def __init__(self, bean: Bean) -> None:
        self.__bean = bean
        self.__validate()

    def __validate(self) -> None:
        if self.__bean.deleted_when:
            raise self.CannotRunAnalytics(
                f"{self.__bean.name} is deleted and can not have analytics performed against it."
            )

    def retrieve(self) -> dict:
        """
        Actually pulls the data / transforms it into a usable format.
        """

        active_flavor_profiles = RoastProfileFlavors.objects.filter(
            deleted_when=None,
            roast_profile__deleted_when=None,
            roast_profile__roast__deleted_when=None,
            roast_profile__roast__bean=self.__bean,
        )
        return transform_roast_flavor_profiles(self.__bean.name, active_flavor_profiles)
