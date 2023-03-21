import { Center, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const EventSkeleton = () => {
  return (
    <Flex flexDirection={'column'} gap='2' maxW={'1272px'}>
      <SkeletonText noOfLines={1} height={'43px'} w={'300px'} mt={'15px'} />
      <SkeletonText noOfLines={1} height={'30px'} w={'250px'} />
      <Center flexWrap={'wrap'}>
        <Skeleton m={'10px'} w={'295px'} h={'500px'} />
        <Skeleton m={'10px'} w={'295px'} h={'500px'} />
        <Skeleton m={'10px'} w={'295px'} h={'500px'} />
        <Skeleton m={'10px'} w={'295px'} h={'500px'} />
      </Center>
    </Flex>
  );
};

export default EventSkeleton;