import React from 'react';
import {
  GraduationCap,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Globe,
  Users,
  Heart,
  BookOpen,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Shield,
  CreditCard,
  HelpingHand,
  Activity,
  Award,
  Share2,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Stethoscope':
      return <Stethoscope className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'ArrowRight':
      return <ArrowRight className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} />;
    case 'Lock':
      return <Lock className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Phone':
      return <Phone className={className} />;
    case 'Mail':
      return <Mail className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'ChevronRight':
      return <ChevronRight className={className} />;
    case 'Shield':
      return <Shield className={className} />;
    case 'CreditCard':
      return <CreditCard className={className} />;
    case 'HelpingHand':
      return <HelpingHand className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Share2':
      return <Share2 className={className} />;
    case 'Menu':
      return <Menu className={className} />;
    case 'X':
      return <X className={className} />;
    case 'ExternalLink':
      return <ExternalLink className={className} />;
    case 'ChevronDown':
      return <ChevronDown className={className} />;
    case 'AlertCircle':
      return <AlertCircle className={className} />;
    default:
      return <HeartHandshake className={className} />;
  }
};
