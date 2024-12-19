import { Grid } from '@mantine/core';
import ServiceCard from './ServiceCard';


const GridServices=()=>{

    return (
        <Grid grow gutter="md" style={{margin:'40px'}}>
      <Grid.Col span={4}>
        <ServiceCard image="image1.jpg" text="Service 1" />
      </Grid.Col>
      <Grid.Col span={4}>
        <ServiceCard image="image2.jpg" text="Service 2" />
      </Grid.Col>
      <Grid.Col span={4}>
        <ServiceCard image="image3.jpg" text="Service 3" />
      </Grid.Col>
      <Grid.Col span={4}>
        <ServiceCard image="image4.jpg" text="Service 4" />
      </Grid.Col>
      <Grid.Col span={4}>
        <ServiceCard image="image5.jpg" text="Service 5" />
      </Grid.Col>
    </Grid>
  );
};
export default GridServices;