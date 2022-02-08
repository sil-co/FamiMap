

const nodes = [
  {
    id: 1,
    pids: [3], gender: 'male', photo: 'https://cdn.balkan.app/shared/m60/2.jpg',
    name: 'Zeph Daniels', bdate: '1954-09-29', ddate: '1990-01-02'
  },
  {
    id: 2, pids: [3], gender: 'male', photo: 'https://cdn.balkan.app/shared/m60/1.jpg',
    name: 'Rowan Annable', bdate: '1952-10-10', email: 'Rowan@gmail.com', phone: '07084848888',
    history: '1952 My birthday. 1980 I marryed current wife. 1988 My friend was dead. 1990 I\'m happy',

  },
  {
    id: 3, pids: [1, 2], gender: 'female', photo: 'https://cdn.balkan.app/shared/w60/1.jpg',
    name: 'Laura Shepherd', bdate: '1943-01-13', email: 'laura.shepherd@gmail.com', phone: '+44 845 5752 547', city: 'Moscow', country: 'ru'
  },
  {
    id: 4, pids: [5], gender: 'male', photo: 'https://cdn.balkan.app/shared/m60/3.jpg',
    name: 'Rowan Annable'
  },
  {
    id: 5, pids: [4], gender: 'female', photo: 'https://cdn.balkan.app/shared/w60/3.jpg',
    name: 'Lois Sowle'
  },
  {
    id: 6, mid: 2, fid: 3, pids: [7], gender: 'female', photo: 'https://cdn.balkan.app/shared/w30/1.jpg',
    name: 'Tyler Heath', bdate: '1975-11-12'
  },
  {
    id: 7, pids: [6], mid: 5, fid: 4, gender: 'male', photo: 'https://cdn.balkan.app/shared/m30/3.jpg',
    name: 'Samson Stokes', bdate: '1986-10-01'
  },
  {
    id: 8, mid: 7, fid: 6, gender: 'female', photo: 'https://cdn.balkan.app/shared/w10/3.jpg',
    name: 'Celeste Castillo', bdate: '2021-02-01'
  },
  {
    id: 9, mid: 7, fid: 6, gender: 'male', name: 'Justin bieber', bdate: '1991-02-04', ddate: '1992-02-04'
  },

]

export default nodes;


