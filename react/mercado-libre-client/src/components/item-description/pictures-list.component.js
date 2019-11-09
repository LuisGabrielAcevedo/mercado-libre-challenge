import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

function PicturesListComponent({
  picturesList,
  selectedPicture,
  onMouseEnter
}) {
  let picturesToRender = [];
  if (picturesList.length) {
    const limit = picturesList.length >= 6 ? 6 : picturesList.length;
    for (var i = 0; i < limit; i++) {
      picturesToRender.push(picturesList[i]);
    }
  }

  return (
    <Grid container direction="column" className="list">
      {picturesToRender.map((pic, i) => (
        <Grid
          key={i}
          item
          className={
            pic.id === selectedPicture.id
              ? "list__item pic--active"
              : "list__item"
          }
        >
          <Grid
            container
            alignContent="center"
            justify="center"
            className="list__item__content"
          >
            <img
              src={pic.url}
              alt={pic.id}
              onMouseEnter={() => onMouseEnter(pic)}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

PicturesListComponent.propTypes = {
  picturesList: PropTypes.array,
  selectedPicture: PropTypes.object,
  onMouseEnter: PropTypes.func
};

export default PicturesListComponent;
