import React from 'react';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { IconType } from 'react-icons';

interface CategoryItemProps {
    icon: IconType,
    label: string;
    selected?: boolean;
    description: string;
    onClick: (value: string) => void;
}

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!',
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is has windmills!',
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This is property has a beautiful pool!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is near a lake!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activies!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is an ancient castle!'
    },
    {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property offers camping activities!'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic environment!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn!'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!'
    }
]

const CategoryItem: React.FC<CategoryItemProps> = ({ icon: Icon, label, selected, onClick, description }) => {
    return (
        <div onClick={() => onClick(label)} className={`rounded-xl border-2 p-4 flex flex-col gap-3 cursor-pointer hover:bg-purple-300 transition duration-300 ease-in-out transform ${selected ? 'bg-purple-300' : 'border-neutral-200'}`}>
            <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                    <Icon size={30} />
                </div>
            </div>
            <div className="text-lg font-semibold">{label}</div>
            <div className="text-gray-600">{description}</div>
        </div>
    );
};

export default CategoryItem;
