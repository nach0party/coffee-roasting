import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

/**
 * Provides a raw bean avatar
 * TOOD we need to provide some origin information, if there's a way to consolidate this / make it nice
 * @param {*} param0
 * @returns
 */
export const RawBeanAvatar = ({ name, onClick, isSelected, sx, src }) => {
  return (
    <>
      <Box sx={{ textAlign: "center", p: 0, m: 0 }}>
        <Avatar
          onClick={async () => {
            await onClick();
          }}
          className={"coffee-grid"}
          sx={(theme) => ({
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
        <Divider sx={{ mt: 2 }} />
        <Typography
          sx={{
            m: 0,
            p: 0,
            lineHeight: 1.0,
            mt: 1,
            display: "block",
          }}
          variant="overline"
        >
          {name}
        </Typography>
      </Box>
    </>
  );
};
