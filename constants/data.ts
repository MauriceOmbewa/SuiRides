// Mock data for demonstration purposes

export const driverRideRequests = [
  {
    id: 'ride-1',
    rider: {
      name: 'John Doe',
      rating: 4.8,
      trips: 24,
    },
    pickup: {
      location: 'Central Park',
      address: '59th St & 5th Ave, New York',
      distance: '2.4 km',
      eta: '5 min',
    },
    dropoff: {
      location: 'Empire State Building',
      address: '350 5th Ave, New York',
      distance: '3.8 km',
    },
    fare: {
      amount: '$12.50',
      currency: 'USD',
      duration: '15 min',
    },
    status: 'pending',
    timestamp: new Date(),
  },
  {
    id: 'ride-2',
    rider: {
      name: 'Jane Smith',
      rating: 4.9,
      trips: 58,
    },
    pickup: {
      location: 'Times Square',
      address: 'Broadway & 7th Ave, New York',
      distance: '1.2 km',
      eta: '3 min',
    },
    dropoff: {
      location: 'Grand Central Terminal',
      address: '89 E 42nd St, New York',
      distance: '2.1 km',
    },
    fare: {
      amount: '$8.75',
      currency: 'USD',
      duration: '10 min',
    },
    status: 'pending',
    timestamp: new Date(),
  },
];

export const riderRecentLocations = [
  {
    id: 'loc-1',
    name: 'Home',
    address: '123 Main St, Apartment 4B',
    icon: 'home',
  },
  {
    id: 'loc-2',
    name: 'Work',
    address: '555 Business Ave, Floor 12',
    icon: 'briefcase',
  },
  {
    id: 'loc-3',
    name: 'Gym',
    address: '789 Fitness Blvd',
    icon: 'dumbbell',
  },
];

export const vehicleTypes = [
  {
    id: 'regular',
    name: 'Regular',
    capacity: '4',
    price: 'Standard',
    eta: '3 min',
    icon: 'car',
  },
  {
    id: 'premium',
    name: 'Premium',
    capacity: '4',
    price: '+30%',
    eta: '5 min',
    icon: 'car-sports',
  },
  {
    id: 'xl',
    name: 'XL',
    capacity: '6',
    price: '+50%',
    eta: '7 min',
    icon: 'car-estate',
  },
];

export const driverEarnings = {
  today: {
    amount: '$86.45',
    trips: 7,
    hours: '5h 23m',
  },
  week: {
    amount: '$542.30',
    trips: 38,
    hours: '32h 15m',
  },
  month: {
    amount: '$2,105.75',
    trips: 142,
    hours: '128h 30m',
  },
};

export const riderTrips = [
  {
    id: 'trip-1',
    date: '2023-05-15',
    pickup: 'Home',
    dropoff: 'Work',
    driver: 'Michael K.',
    amount: '$12.50',
    status: 'completed',
    rating: 5,
  },
  {
    id: 'trip-2',
    date: '2023-05-12',
    pickup: 'Work',
    dropoff: 'Home',
    driver: 'Sarah L.',
    amount: '$13.25',
    status: 'completed',
    rating: 4,
  },
  {
    id: 'trip-3',
    date: '2023-05-10',
    pickup: 'Home',
    dropoff: 'Gym',
    driver: 'David M.',
    amount: '$8.75',
    status: 'completed',
    rating: 5,
  },
];

export const loyaltyProgress = {
  rider: {
    rides: 78,
    target: 100,
    reward: 'Free Ride (up to $25)',
  },
  driver: {
    rides: 212,
    target: 250,
    reward: 'Bonus $50',
  },
};

export const messageThreads = [
  {
    id: 'msg-1',
    name: 'SuiRides Support',
    lastMessage: 'How can we help you today?',
    timestamp: '10:23 AM',
    unread: true,
  },
  {
    id: 'msg-2',
    name: 'David (Driver)',
    lastMessage: 'I have arrived at the location',
    timestamp: 'Yesterday',
    unread: false,
  },
  {
    id: 'msg-3',
    name: 'SuiRides Promotions',
    lastMessage: 'Weekend discount: 15% off your next 3 rides!',
    timestamp: 'May 12',
    unread: false,
  },
];