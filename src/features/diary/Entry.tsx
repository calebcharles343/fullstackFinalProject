import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { dateformat } from "../../utils/dateFormat";
import { useDeleteEntry } from "./useDeleteEntry";
import EditDiaryForm from "./EditDiaryForm";
import { BiEdit, BiTrash, BiCalendarPlus } from "react-icons/bi";
import TableModal from "../../ui/TableModal";
import { EventType } from "../../interfaces";
import truncate from "truncate-html";

declare const gapi: any;

export default function Entry({
  entry,
  isShowEvent,
  setIsShowEvent,
}: {
  entry: EventType;
  isShowEvent?: boolean;
  setIsShowEvent?: Dispatch<SetStateAction<true | false>>;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const { deleteEntry, isDeleting } = useDeleteEntry();

  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
    setIsEdit(false);
    if (setIsShowEvent) {
      setIsShowEvent(false);
    }
  };

  // Load Google API client library and initialize it
  const loadGoogleAPI = () => {
    gapi.load("client:auth2", initClient);
  };

  const initClient = () => {
    gapi.client
      .init({
        apiKey: "AIzaSyA19KUErfwrGWl4WsBfLnOqeqTc_N5JGAw",
        clientId:
          "759906290313-k7v0alpbhtoibtpd8jjkcj626763d88o.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.events",
      })
      .then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(authInstance.isSignedIn.get());
      })
      .catch((error: any) => {
        console.error("Error initializing Google API client:", error);
      });
  };

  const updateSigninStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      console.log("User is signed in.");
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  };

  const handleAddToCalendar = () => {
    const event = {
      summary: entry.title,
      description: entry.content,
      start: {
        dateTime: entry.createdAt, // Adjust to your actual datetime format
        timeZone: "Your Time Zone",
      },
      end: {
        dateTime: new Date(
          new Date(entry.createdAt).getTime() + 60 * 60 * 1000
        ).toISOString(), // Adjust to your actual end time
        timeZone: "Your Time Zone",
      },
    };

    gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        resource: event,
      })
      .then((response: any) => {
        console.log("Event created: " + response.htmlLink);
        alert("Event added to Google Calendar");
      });
  };

  // Load Google API client library on component mount
  useEffect(() => {
    loadGoogleAPI();
  }, []);

  return (
    <>
      {!isEdit && (
        <div
          className={`flex flex-col w-full  ${!isShowEvent && "h-[175px]"} ${
            isShowEvent && "md:w-[400px]"
          }  text-gray-700 border-r-[5px] border-teal-500 rounded-lg shadow-lg p-4 bg-gradient-to-tr from-white to-red-50`}
        >
          <div className="flex justify-between mb-2">
            <h2
              className={`${
                isShowEvent ? "text-sm" : "text-[13px]"
              } md:text-base font-semibold break-words`}
            >
              {truncate(entry.title, {
                length: isShowEvent ? 25 : 15,
                ellipsis: "...",
              })}
            </h2>
            {isShowEvent && (
              <div className="flex items-center gap-3">
                <button
                  className="py-1 text-xs text-teal-500 transition-colors hover:text-teal-700"
                  onClick={handleToggleEdit}
                >
                  {isEdit ? "Cancel" : <BiEdit />}
                </button>
                <button
                  className="py-1 text-sm text-red-500 transition-colors hover:text-red-700"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  {isDeleting ? "..." : <BiTrash />}
                </button>
                <button
                  className="py-1 text-sm text-blue-500 transition-colors hover:text-blue-700"
                  onClick={handleAddToCalendar}
                >
                  <BiCalendarPlus />
                </button>
              </div>
            )}
          </div>
          <div className="flex-grow overflow-hidden">
            <div
              className={`${
                isShowEvent ? "text-xs" : "text-[12px]"
              } md:text-sm overflow-y-hidden overflow-x-hidden`}
            >
              <p>{entry.content}</p>
            </div>
          </div>

          <span className="mt-2 text-xs text-rose-500 font-bold text-right">
            {dateformat(entry?.createdAt)}
          </span>
        </div>
      )}

      {isEdit && (
        <TableModal onClose={handleToggleEdit}>
          <div className="bg-white mt-4 shadow-lg p-4 rounded-lg">
            <EditDiaryForm
              entry={entry}
              setIsEdit={setIsEdit}
              setIsShowEvent={setIsShowEvent}
            />
          </div>
        </TableModal>
      )}
    </>
  );
}

// Ensure you replace "YOUR_API_KEY" and "YOUR_CLIENT_ID" with your actual Google API credentials.
