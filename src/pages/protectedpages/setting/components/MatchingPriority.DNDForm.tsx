import { Flex, Td } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { matchingTypes } from "./matching.types";

interface DraggableItemProps {
    item: matchingTypes;
    index: number;
    moveItem: (fromIndex: number, toIndex: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index, moveItem }) => {
    const [, ref] = useDrag({
        type: "ITEM",
        item: { index }
    });

    const [, drop] = useDrop({
        accept: "ITEM",
        hover: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        }
    });

    return (
        <Td
            minWidth={"28rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid gray"}
            ref={(node) => ref(drop(node))}
            cursor={"grab"}
        >
            {item.text}
        </Td>
    );
};

interface MatchingPriorityDNDFormProps {
    items: matchingTypes[];
    setItems: React.Dispatch<React.SetStateAction<matchingTypes[]>>;
}

const MatchingPriorityDNDForm = ({ items, setItems }: MatchingPriorityDNDFormProps) => {
    const moveItem = (fromIndex: number, toIndex: number) => {
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);

        setItems(updatedItems);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Flex flexDir={"column"} gap={4}>
                {items.map((item: matchingTypes, index) => (
                    <DraggableItem key={item.id} item={item} index={index} moveItem={moveItem} />
                ))}
            </Flex>
        </DndProvider>
    );
};

export default MatchingPriorityDNDForm;
