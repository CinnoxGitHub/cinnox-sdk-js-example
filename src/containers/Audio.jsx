import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const Audio = (props) => {
  const { stream } = props;
  const [isReady, setReady] = useState(false);
  const audioRef = useRef(null);

  const initRef = useCallback((node) => {
    audioRef.current = node;
    if (!node) return;

    setReady(true);
  }, []);

  useEffect(() => {
    if (stream && stream?.active && isReady) {
      audioRef.current.srcObject = stream;
      audioRef.current.play();
    }

    return () => {
      if (isReady && audioRef.current) {
        try {
          audioRef.current.pause();
        } catch (error) {
          console.log('pause main audio with error', error);
        }
      }
    };
  }, [stream, stream?.active, isReady]);

  return (
    <audio ref={initRef} />
  );
};

Audio.defaultProps = {
  stream: null,
}

Audio.propTypes = {
  stream: PropTypes.object,
}

export default Audio;
