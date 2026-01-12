import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

/**
 * Provides a raw bean avatar
 * TOOD we need to provide some origin information, if there's a way to consolidate this / make it nice
 * @param {*} param0
 * @returns
 */
export const RawBeanAvatar = ({
  name,
  onClick,
  isSelected,
  sx,
  src = "/coffee-being-roasted.jpg",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // This keeps the Avatar and Text centered on the vertical axis
        width: 175, // Match the Avatar width or set to 100%
        margin: "0 auto", // Centers the container itself if it's in a larger Grid
      }}
    >
      <Avatar
        onClick={onClick}
        sx={(theme) => ({
          width: 175,
          height: 175,
          cursor: "pointer",
          width: 175,
          height: 175,
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
          "&:focus-visible": {
            outline: "none",
          },
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
            backgroundColor: (theme) => theme.palette.action.hover,
          },
          border: isSelected
            ? `2px solid ${theme.palette.primary.main}`
            : "none",
          ...sx,
        })}
        src={src}
      />
      <Divider sx={{ mt: 2, width: "100%" }} />
      <Typography
        variant="overline"
        align="center"
        sx={{
          mt: 1,
          width: "100%",
          lineHeight: 1.2,
          display: "block",
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};
