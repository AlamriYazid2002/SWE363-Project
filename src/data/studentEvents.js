const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

const today = new Date();
today.setHours(0, 0, 0, 0);

const baseEvents = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    organizer: "IEEE Student Chapter",
    organizerType: "Student Organization",
    category: "Technology",
    daysFromNow: 2,
    time: "2:00 PM – 5:00 PM",
    venue: "Building 5, Room 301",
    capacity: 100,
    registered: 45,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Cybersecurity Seminar",
    organizer: "Computer Society",
    organizerType: "Club",
    category: "Technology",
    daysFromNow: 5,
    time: "6:00 PM – 8:00 PM",
    venue: "Main Auditorium",
    capacity: 80,
    registered: 30,
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Cultural Night",
    organizer: "Student Council",
    organizerType: "Student Council",
    category: "Cultural",
    daysFromNow: 10,
    time: "7:00 PM – 10:00 PM",
    venue: "Central Courtyard",
    capacity: 200,
    registered: 150,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Tech Career Fair 2025",
    organizer: "Career Services",
    organizerType: "University Department",
    category: "Career",
    daysFromNow: 16,
    time: "10:00 AM – 4:00 PM",
    venue: "Exhibition Hall",
    capacity: 300,
    registered: 178,
    image:
      "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Intercollegiate Football Tryouts",
    organizer: "Athletics Department",
    organizerType: "Athletics",
    category: "Sports",
    daysFromNow: 28,
    time: "6:00 PM – 8:00 PM",
    venue: "Main Stadium",
    capacity: 120,
    registered: 64,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Sustainability Drive",
    organizer: "Green Club",
    organizerType: "Student Organization",
    category: "Environmental",
    daysFromNow: 41,
    time: "9:00 AM – 12:00 PM",
    venue: "Building 3, Lobby",
    capacity: 90,
    registered: 40,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  },
];

const buildEvents = () =>
  baseEvents.map((event) => {
    const date = new Date(today);
    date.setDate(today.getDate() + event.daysFromNow);

    return {
      ...event,
      date: dateFormatter.format(date),
      dateValue: date.getTime(),
    };
  });

const cachedEvents = buildEvents();

export function getStudentEvents() {
  return cachedEvents;
}

export function getStudentEventById(eventId) {
  return cachedEvents.find((event) => event.id === eventId);
}
