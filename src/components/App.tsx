import { JssProvider, ThemeProvider } from "react-jss";

import ControlsContent from "./ControlsContent";
import MainContent from "./MainContent";
import MapsContent from "./MapsContent";
import Modal from "./common/Modal";
import FeedbackForm from "./FeedbackForm";
import React from "react";
import jssSetUp from "utils/jssSetUp";
import { useData, INITIAL_DATA } from "context";

export default function App(): JSX.Element {
  // eslint-disable-next-line
  const { theme } = useData()!;
  const [showNotes, setShowNotes] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const { version } = useData()!;

  React.useEffect(() => {
    if (version !== INITIAL_DATA.version) {
      setShowNotes(true);
    }
  }, []);

  const patchNotes = [
    {
      title: "Added",
      items: [
        "Separate Scores for impostors and innocents",
        "Color change menu for players",
        "Reset Scores",
        "Reset Round (players positions)",
        "Reset all button, resets to default.",
        "Reset Notes",
        "Settings Modal",
        "Recovery Notes Modal",
        "Change log Modal",
      ],
    },
    { title: "Fixed", items: ["Player background color contrast"] },
    { title: "Changed", items: ["Use names to the settings modal."] },
    { title: "Removed", items: ["Light theme", "Draggable map characters"] },
  ];

  return (
    <React.Fragment>
      <JssProvider registry={jssSetUp(theme)}>
        <ThemeProvider theme={theme}>
          <React.Suspense fallback="loading">
            <main>
              <MainContent />
              <ControlsContent />
              <MapsContent />
            </main>
            <footer>
              <small>
                fusliez notes{" "}
                <a
                  href="https://github.com/Kedyn/fusliez-notes/releases/tag/v0.7.0"
                  onClick={(
                    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                  ) => {
                    event.preventDefault();
                    setShowNotes(!showNotes);
                  }}
                >
                  v0.8.0 (Preview)
                </a>{" "}
                [9/24/2020] made with &#10084; by the{" "}
                <a href="https://github.com/Kedyn/fusliez-notes#authors-and-acknowledgment">
                  fuslie fam
                </a>
                . <a onClick={() => setShowForm(true)}>Feedback</a>
                <Modal
                  title="Feedback Form"
                  show={showForm}
                  onClose={() => setShowForm(false)}
                >
                  <FeedbackForm />
                </Modal>
              </small>
            </footer>
            {/* CHANGE LOG */}
            <Modal
              title="Change Log v0.8.0"
              show={showNotes}
              onClose={() => setShowNotes(false)}
            >
              {patchNotes.map(({ title, items }) => (
                <div>
                  <h3>{title}</h3>
                  <ul>
                    {items.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Modal>
          </React.Suspense>
        </ThemeProvider>
      </JssProvider>
    </React.Fragment>
  );
}
