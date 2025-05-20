import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Sparkles from './components/animations/Sparkles';
import FloatingHearts from './components/animations/FloatingHearts';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);
  const [postIntroStep, setPostIntroStep] = useState(1);
  const [showFirstMessageBox, setShowFirstMessageBox] = useState(false);
  const [showReadMoreBox, setShowReadMoreBox] = useState(false);
  const [videoPassword, setVideoPassword] = useState('');
  const [videoUnlocked, setVideoUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 2000);
  };

  const handleNextStep = () => {
    setPostIntroStep((prev) => prev + 1);
  };

  // New handler for first Next button in step 1
  const handleShowFirstMessage = () => {
    setShowFirstMessageBox(true);
  };

  // New handler for Read More button
  const handleShowReadMore = () => {
    setShowReadMoreBox(true);
  };

  const handlePasswordSubmit = () => {
    const correctPassword = 'Somu@2704'; // Change this to whatever password you want
    if (videoPassword === correctPassword) {
      setVideoUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      // Auto-redirect to the next step after 2 seconds
      setTimeout(() => {
        handleNextStep();
      }, 2000);
    }
  };


  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 to-indigo-50 text-gray-800 overflow-hidden">
      {showSparkles && <Sparkles />}
      <FloatingHearts />

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Our Precious Memories
          </h1>
        </header>

        {postIntroStep === 1 && (
          <div className="text-center space-y-6 max-w-xl mx-auto">
            {!showFirstMessageBox && (
              <>
                <p className="text-xl text-gray-700">
                  Here's a message straight from the heart — I’ve treasured every moment with you.
                </p>
                <button
                  onClick={handleShowFirstMessage}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md hover:scale-105 transition"
                >
                  Next
                </button>
              </>
            )}

            {showFirstMessageBox && (
              <>
                <div className="p-6 bg-white rounded-lg shadow-md text-left text-gray-800">
                  <p>
                    Hi Somu baby...
                    Congratulations on your first job! I can’t express how proud and happy I am for you. Watching you work so hard, stay determined, and push through every challenge has been truly inspiring. You’ve earned this moment, and I know it’s only the beginning of something amazing. This opportunity is a reflection of your talent, dedication, and the passion you bring to everything you do.
                    Stepping into the professional world can feel like a big leap, but I have no doubt you’ll shine bright and make a lasting impact. Keep believing in yourself, stay curious, and never stop learning—you’ve got everything it takes to thrive.
                    Celebrate this moment, you deserve every bit of it! I’m so excited to see where this journey takes you, and I’ll always be cheering you on from the sidelines. Here's to new beginnings, new goals, and countless successes ahead. You’ve truly earned it!
                  </p>
                </div>

                {!showReadMoreBox && (
                  <button
                    onClick={handleShowReadMore}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md shadow-sm hover:brightness-110 transition"
                  >
                    Read More
                  </button>
                )}

                {showReadMoreBox && (
                  <>
                    <div className="mt-4 p-6 bg-white rounded-lg shadow-md text-left text-gray-800">
                      <p>
                        Kitna English padhegi abhi...Bahut English bol liya maine....ab hindi padho...
                        Jaise mein humesha bolta hun jab mein pehli baar college aaya tha tab mujhe mere college life kaisa hoga usse sab se bada dar tha ki meri roomate kaisi hogi and conincidently tum mil gayi mereko..
                        Aaj woh pehla din and aaj ka din yaad karte hein toh bahut acha lagta hai. Tum se bahut kuch sikhne ko mila hai, be it coding, dsa, love life, friendship, etc etc..
                        But han tum thi toh college life bada interesting ban gaya....late night gossips, secrets sab pata hai yaar tumko mera....itna toh kisi ke samne bhi open up nhi hua jitna tumko pata hai...
                        Aaj usi insaan ko grow karte hue dekh bada acha lagta hai...Khub taraki karo life me... Ab isse jyada kya hi bolu... jaldi se internship khatam karke wapis aao BBSR, though tumko pasand nahi BBSR
                        but still aa jana because hum sab hai yahan specially me... Aur next suprise ko dekh kar hope so tumko thoda wapis aane ka man kar jaaye...Password daalo and see something unfiltered...
                      </p>
                    </div>

                    <button
                      onClick={handleNextStep}
                      className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md hover:scale-105 transition"
                    >
                      Continue
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}


        {postIntroStep === 2 && (
          <div className="text-center space-y-6 max-w-xl mx-auto">
            {!videoUnlocked ? (
              <>
                <p className="text-lg text-gray-700">Enter the password to watch the special video 💌</p>
                <input
                  type="password"
                  value={videoPassword}
                  onChange={(e) => setVideoPassword(e.target.value)}
                  className="mt-2 px-4 py-2 border rounded-md shadow-sm w-full max-w-xs mx-auto"
                  placeholder="Enter password"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">Incorrect password. Redirecting...</p>
                )}
                <button
                  onClick={handlePasswordSubmit}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-md hover:scale-105 transition"
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <video controls className="mx-auto w-full max-w-lg rounded-lg shadow-lg">
                  <source src="https://www.dropbox.com/scl/fi/cbiejy8t3xsbm18yuthh7/VN20250520_015105.mp4?rlkey=dyoz2bqdt2x4wa0hizb4bvqhj&st=x0mz1z5q&raw=1" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <button
                  onClick={handleNextStep}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md hover:scale-105 transition"
                >
                  Next
                </button>
              </>
            )}
          </div>
        )}


        {postIntroStep === 3 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
            <audio controls className="w-full max-w-md mx-auto">
              <source src="/voice.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p className="text-gray-600 italic">Hope this made your day special 💖</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;









