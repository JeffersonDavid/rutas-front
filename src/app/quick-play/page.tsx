'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../appContexts/AuthContext';
import CustomAlert from '../components/alerts/customAlert';
import { useRouter } from 'next/navigation';
import { useLoader } from '../appContexts/AppLoader';

const QuickPlay: React.FC = () => {
  const { login } = useAuth();
 return ('quick play');
};

export default QuickPlay;
