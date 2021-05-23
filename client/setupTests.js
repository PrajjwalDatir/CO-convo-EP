/* eslint-disable import/no-extraneous-dependencies */

// enzyme setup reference:
// https://github.com/airbnb/enzyme
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// to mount properly with jsdom
// see: https://github.com/stimulusjs/stimulus/issues/130
import 'mutationobserver-shim';

configure({ adapter: new Adapter() });
