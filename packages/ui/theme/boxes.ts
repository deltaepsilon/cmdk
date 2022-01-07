import { ThemeUIStyleObject } from 'theme-ui';

const SHARED = { padding: 30 };

const boxes: ThemeUIStyleObject = {
  padded: {
    ...SHARED,
  },
  callout: {
    marginTop: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'tertiary300',
    borderRadius: 'xxl',
    backgroundColor: 'rgba(214, 125, 74, 0.1)',
    fontSize: 0,
    padding: 3,
  },
  border: {
    borderRadius: 'xxl',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray300',
    ...SHARED,
  },
  background: {
    borderRadius: 'xxl',
    backgroundColor: 'gray100',
    ...SHARED,
  },
  raised: {
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: 'xxl',
  },
  pinned: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

export default boxes;
