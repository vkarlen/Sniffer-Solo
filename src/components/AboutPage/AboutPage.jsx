import { Container, Grid } from '@material-ui/core';

import './AboutPage.css';

function AboutPage() {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4} justify="space-evenly">
        <Grid item xs={10} id="about">
          <h2>About</h2>
          <p>
            Sniffer is designed to help the average pet owner manage their dog's
            food sensitivities and find the best food to fit their dog's needs.
          </p>
          <p>
            Sniffer was developed from scratch over a 2 week sprint as the final
            solo project at Prime Digital Academy. Some of the technologies used
            are Javascript, Node, Express, React, Redux, PostgreSQL, and
            Material UI.
          </p>
        </Grid>

        <Grid item xs={8}>
          <h3>Upcoming Features</h3>
          <ul>
            <li>
              Ability to analyze your dog's food log to find the common
              ingredient groups.
            </li>
            <li>
              Expand Comparison Tool to allow for more than two foods to be
              compared at a time.
            </li>
            <li>
              Allow for users to upload images of their pet directly to the
              website.
            </li>
            <li>
              Expand the site to include cats as well as add wet and raw food
              options.
            </li>
          </ul>
        </Grid>

        <Grid item xs={10}>
          <p id="acknowledgement">
            Thank you to my instructors, Edan and Chad, as well as the Cullen
            Cohort, and Prime staff for all of their help and support over the
            course of the program. If you have any questions or comments, please
            contact me at Vada.Karlen@Gmail.com
          </p>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutPage;
