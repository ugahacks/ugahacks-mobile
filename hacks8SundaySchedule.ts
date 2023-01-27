import { EventTag } from "./enums/EventTag";

export const sundaySchedule = [
  {
    start: "8:00 AM",
    eventList: [
      {
        name: "Breakfast",
        startTime: "8:00 AM",
        endTime: "9:00 AM",
        tag: EventTag.FOOD,
        location: "MLC",
        description: "Get your delicious and nutritious breakfast!",
      },
      {
        name: "Projects Submission Deadline",
        startTime: "8:00 AM",
        endTime: "8:00 AM",
        tag: EventTag.IMPORTANT,
        location: "MLC",
        description: "Submit your projects to dev post and mybyte!",
      },
    ],
  },
  {
    start: "9:00 AM",
    eventList: [
      {
        name: "Expo",
        startTime: "9:00 AM",
        endTime: "2:00 PM",
        tag: EventTag.IMPORTANT,
        location: "MLC",
        description:
          "Judging starts, there will be an expo to display your projects and showcase to other people!",
      },
    ],
  },
  {
    start: "2:00 PM",
    eventList: [
      {
        name: "Closing Ceremony",
        startTime: "2:30 PM",
        endTime: "3:00 PM",
        tag: EventTag.CEREMONY,
        location: "MLC",
        description: "Learn about the winners and closing ceremony!",
      },
    ],
  },
];
