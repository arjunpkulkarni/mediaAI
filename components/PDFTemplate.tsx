// boulevard-app/src/components/PDFTemplate.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link, Font } from '@react-pdf/renderer';

interface Audience {
  gender: { [key: string]: number };
  age: { [key: string]: number };
  interests: string[];
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#1A1A1A',
    padding: 40,
    fontFamily: 'Helvetica',
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  headerTextContainer: {
    flex: 2,
  },
  yourName: {
    fontSize: 16,
    color: '#B3B3B3',
    marginBottom: 4,
  },
  mediaKit: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 1,
  },
  bio: {
    fontSize: 11,
    color: '#B3B3B3',
    marginTop: 12,
    maxWidth: '80%',
  },
  headerImageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  colorBlocks: {
    flexDirection: 'row',
    marginTop: 8,
  },
  colorBlock: {
    width: 20,
    height: 30,
    marginLeft: 5,
  },
  overviewSection: {
    marginBottom: 30,
  },
  overviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalFollowersContainer: {
    backgroundColor: '#FFC700',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  totalFollowersCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalFollowersText: {
    fontSize: 10,
    color: '#000000',
  },
  socialStatsContainer: {
    width: '68%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socialStat: {
    backgroundColor: '#292929',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialStatText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  socialStatSubtitle: {
    fontSize: 10,
    color: '#B3B3B3',
  },
  audienceSection: {
    marginBottom: 30,
  },
  audienceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  audienceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  audienceCategory: {
    fontSize: 12,
    color: '#B3B3B3',
    width: '20%',
  },
  audienceBar: {
    width: '78%',
    height: 12,
    backgroundColor: '#292929',
    borderRadius: 6,
  },
  audienceBarFill: {
    height: 12,
    backgroundColor: '#A97CFF',
    borderRadius: 6,
  },
  audienceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  audienceLabel: {
    fontSize: 10,
    color: '#808080',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#292929',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 11,
  },
  pastHighlightsSection: {
    marginBottom: 30,
  },
  pastHighlightsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  postGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  postImageContainer: {
    width: '24%',
    aspectRatio: 0.5625,
    marginRight: '1.33%',
    marginBottom: 10,
    backgroundColor: '#292929',
    borderRadius: 8,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#808080',
  },
});

interface PDFTemplateProps {
  instagramData?: any;
  tiktokData?: any;
  bio?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
  name?: string;
  profilePicture?: string;
  audience?: Audience;
}

const PDFTemplate: React.FC<PDFTemplateProps> = ({
  instagramData,
  tiktokData,
  bio,
  instagramHandle,
  tiktokHandle,
  name,
  profilePicture,
  audience,
}) => {
  const igStats = instagramData?.profileDetails;
  const tkStats = tiktokData?.stats;
  const igFollowers = igStats?.followerCount || 0;
  const tkFollowers = tkStats?.followerCount || 0;
  const totalFollowers = igFollowers + tkFollowers;
  const allPosts = [
    ...(instagramData?.topPosts || []),
    ...(tiktokData?.topPosts || [])
  ].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments)).slice(0, 9);


  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num;
  };

  const displayName = name || 'Your Name';
  const displayBio = bio || 'Write something about yourself here. Keep it short, simple and include a bit of your personality.';
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.yourName}>{displayName}</Text>
            <Text style={styles.mediaKit}>Media Kit</Text>
            <Text style={styles.bio}>{displayBio}</Text>
          </View>
          <View style={styles.headerImageContainer}>
            {profilePicture ? (
              <Image style={styles.profileImage} src={profilePicture} />
            ) : (
              <View style={[styles.profileImage, { backgroundColor: '#292929' }]} />
            )}
            <View style={styles.colorBlocks}>
              <View style={[styles.colorBlock, { backgroundColor: '#A97CFF' }]} />
              <View style={[styles.colorBlock, { backgroundColor: '#FF8A65' }]} />
              <View style={[styles.colorBlock, { backgroundColor: '#4CAF50' }]} />
            </View>
          </View>
        </View>

        <View style={styles.overviewSection}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <View style={styles.overviewContainer}>
            <View style={styles.totalFollowersContainer}>
              <Text style={styles.totalFollowersCount}>{formatNumber(totalFollowers)}</Text>
              <Text style={styles.totalFollowersText}>Total Social Reach Across All Platforms</Text>
            </View>
            <View style={styles.socialStatsContainer}>
              {tkStats && (
                <View style={styles.socialStat}>
                  <Image style={styles.socialIcon} src="https://img.icons8.com/color/48/tiktok.png" />
                  <View>
                    <Text style={styles.socialStatText}>{formatNumber(tkFollowers)}</Text>
                    <Text style={styles.socialStatSubtitle}>Followers</Text>
                  </View>
                </View>
              )}
              {igStats && (
                <View style={styles.socialStat}>
                  <Image style={styles.socialIcon} src="https://img.icons8.com/color/48/instagram-new--v1.png" />
                  <View>
                    <Text style={styles.socialStatText}>{formatNumber(igFollowers)}</Text>
                    <Text style={styles.socialStatSubtitle}>Followers</Text>
                  </View>
                </View>
              )}
              {/* Add other platforms here if available, e.g., YouTube, X, Facebook */}
            </View>
          </View>
        </View>
        
        <View style={styles.audienceSection}>
          <Text style={styles.audienceTitle}>Audience</Text>
          
          <View style={styles.audienceGrid}>
            <Text style={styles.audienceCategory}>Gender</Text>
            <View style={styles.audienceBar}>
              <View style={{
                width: `${audience?.gender?.male || 0}%`,
                height: 12,
                backgroundColor: '#FF8A65',
                borderRadius: 6
              }} />
            </View>
          </View>
          <View style={styles.audienceLabels}>
            <Text style={styles.audienceLabel}>Male: {audience?.gender?.male || 0}%</Text>
            <Text style={styles.audienceLabel}>Female: {audience?.gender?.female || 0}%</Text>
          </View>

          {audience?.age && Object.entries(audience.age).map(([range, percentage]) => (
            <View key={range} style={styles.audienceGrid}>
              <Text style={styles.audienceCategory}>{range}</Text>
              <View style={styles.audienceBar}>
                <View style={[styles.audienceBarFill, { width: `${percentage}%` }]} />
              </View>
            </View>
          ))}
          
          <Text style={[styles.audienceTitle, { marginTop: 20, marginBottom: 10 }]}>Interests</Text>
          <View style={styles.interestsContainer}>
            {audience?.interests && audience.interests.map((interest: string) => (
              <Text key={interest} style={styles.interestTag}>{interest}</Text>
            ))}
          </View>
        </View>
        
        <View style={styles.pastHighlightsSection} break>
          <Text style={styles.pastHighlightsTitle}>Past Highlights</Text>
          <View style={styles.postGrid}>
            {allPosts.map((post: any, index: number) => (
              <Link key={post.id} src={post.postUrl} style={[
                styles.postImageContainer,
                (index + 1) % 4 === 0 ? { marginRight: 0 } : {}
              ]}>
                <Image style={styles.postImage} src={post.thumbnailUrl} />
              </Link>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>
          Generated with AI Media Real
        </Text>
      </Page>
    </Document>
  );
};

export default PDFTemplate; 