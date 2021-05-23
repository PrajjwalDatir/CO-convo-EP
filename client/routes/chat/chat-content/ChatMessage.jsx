import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import * as R from 'ramda';
import useEffectOnce from '#/hooks/useEffectOnce';

function ChatMessage({ message }) {
  const isSafeToUpdate = React.useRef(true);
  const [whenMessageWasSent, setWhenMessageWasSent] = React.useState(null);
  const [shouldRecalculateTime, setShouldRecalculateTime] = React.useState(
    true,
  );

  const recalculateTimeInAMinute = React.useCallback(() => {
    setTimeout(() => {
      if (isSafeToUpdate.current) {
        setShouldRecalculateTime(true);
      }
    }, 60 * 1000);
  }, [setShouldRecalculateTime]);

  React.useEffect(() => {
    if (shouldRecalculateTime) {
      setShouldRecalculateTime(false);

      const sent = DateTime.fromISO(message.sent);

      const minutesSinceSend = DateTime.local()
        .diff(sent, 'minutes')
        .toObject().minutes;

      R.o(
        setWhenMessageWasSent,
        R.cond([
          [R.gte(1), R.o(() => 'Just now', recalculateTimeInAMinute)],
          [R.gte(10), R.o(() => sent.toRelative(), recalculateTimeInAMinute)],
          [R.T, () => sent.toLocaleString(DateTime.DATETIME_MED)],
        ]),
      )(minutesSinceSend);
    }
  }, [
    message.sent,
    whenMessageWasSent,
    shouldRecalculateTime,
    recalculateTimeInAMinute,
  ]);

  useEffectOnce(() => () => {
    isSafeToUpdate.current = false;
  });

  return (
    <div className="my-3">
      <div>
        <span className="font-bold mr-1">
          {message.user ? message.user.username : <>&nbsp;</>}
        </span>
        <span className="text-xs text-gray-700">
          <time dateTime={message.sent}>{whenMessageWasSent}</time>
        </span>
      </div>
      <div className="whitespace-pre-line">{message.message}</div>
    </div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    sent: PropTypes.string, // ISO date
    message: PropTypes.string,
  }).isRequired,
};

export default React.memo(ChatMessage);
