import React from "react";
import { Card,Image,Text } from "@mantine/core";

const ServiceCard =({text, image})=>{
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        
    
      <Card.Section>
        <Image src={image} height={160} alt={text} />
      </Card.Section>
      <Text weight={500} align="center" mt="md">
        {text}
      </Text>
    
        </Card>
    )
}
export default ServiceCard;