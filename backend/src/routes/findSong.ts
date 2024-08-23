import dotenv from 'dotenv';
import express from 'express';
import { google } from 'googleapis';

const router = express.Router();
dotenv.config();

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YT_KEY,
});
