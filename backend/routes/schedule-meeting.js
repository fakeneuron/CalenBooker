const express = require('express');
const { saveFormData } = require('../utils/formHandler');
const router = express.Router();

router.post('/', async (req, res) => {
  const { clientName, clientEmail, meetingDate, meetingTime, duration, userId } = req.body;
  console.log('Meeting submission:', { clientName, clientEmail, meetingDate, meetingTime, duration, userId });
  try {
    const { data, error } = await req.supabase
      .from('meetings')
      .insert({
        user_id: userId,
        client_name: clientName,
        client_email: clientEmail,
        meeting_date: meetingDate,
        meeting_time: meetingTime,
        duration: parseInt(duration),
      });
    if (error) throw error;
    await saveFormData(req.db, 'meetings', {
      id: data[0].id,
      user_id: userId,
      client_name: clientName,
      client_email: clientEmail,
      meeting_date: meetingDate,
      meeting_time: meetingTime,
      duration: parseInt(duration),
    });
    res.status(200).json({ message: 'Meeting scheduled successfully!' });
  } catch (error) {
    console.error('Meeting scheduling error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;