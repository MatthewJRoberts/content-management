import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NavLink } from 'react-router-dom';
import NavPrimary from './NavPrimary';

configure({adapter: new Adapter()});

/* Seeding Data */
const navPrimaryPages_0 = [
    {
        _id: "5a5facc5765eac14c49a008f",
        name: "Homepage",
        options: {
            showTitle: true,
        },
        slug: "",
        isHome: true
    },
    {
        _id: "5a5facc5765eac14c49a006f",
        name: "Page Example 1",
        options: {
            showTitle: true,
        },
        slug: "page-example1",
        isHome: false
    },
    {
        _id: "5a5facc5765eac14c49a006d",
        name: "Page Example 2",
        options: {
            showTitle: true,
        },
        slug: "page-example2",
        isHome: false
    },
    {
        _id: "5a5facc5765eac14c49b006d",
        name: "Page Example 3",
        options: {
            showTitle: true,
        },
        slug: "page-example3",
        isHome: false
    }
];

const navPrimaryPages_1 = [
    {
        _id: "5a5facc5765eac14c49a008f",
        name: "Homepage",
        options: {
            showTitle: true,
        },
        slug: "",
        isHome: true
    }
];

describe('<NavPrimary />', () => {

    // beforeEach();

    it('should render the 3 <NavLink /> elements.', () => {
        const wrapper = shallow(<NavPrimary pages={navPrimaryPages_0} />);
        expect(wrapper.find(NavLink)).toHaveLength(3);
    });

    it('should render NO <NavLink /> elements.', () => {
        const wrapper = shallow(<NavPrimary pages={navPrimaryPages_1} />);
        expect(wrapper.find(NavLink)).toHaveLength(0);
    });
});