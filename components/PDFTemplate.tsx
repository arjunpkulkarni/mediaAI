// boulevard-app/src/components/PDFTemplate.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 10,
    marginBottom: 20,
  },
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#111827',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'semibold',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 5,
    marginBottom: 10,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'semibold',
    marginBottom: 5,
  },
  p: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 8,
    width: '48%',
  },
  postGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postImage: {
    width: '32%',
    height: 'auto',
    borderRadius: 6,
    marginBottom: 5,
  },
  text: {},
});

interface PDFTemplateProps {
  instagramData?: any;
  tiktokData?: any;
  bio?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
}

const PDFTemplate: React.FC<PDFTemplateProps> = ({ instagramData, tiktokData, bio, instagramHandle, tiktokHandle }) => {
  const igStats = instagramData?.profileDetails;
  const tkStats = tiktokData?.stats;
  const igPosts = instagramData?.topPosts;
  const tkPosts = tiktokData?.topPosts;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.h1}>
            {(instagramHandle || tiktokHandle)?.toUpperCase()}'s Media Kit
          </Text>
          <Text style={styles.subtitle}>
            {instagramHandle && `@${instagramHandle}`} {tiktokHandle && `| @${tiktokHandle}`}
          </Text>
        </View>

        {/* About Me Section */}
        <View style={styles.section}>
          <Text style={styles.h2}>About Me</Text>
          <Text style={styles.p}>{bio || 'Bio goes here...'}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {igStats && (
            <View style={styles.statBox}>
              <Text style={styles.h3}>Instagram</Text>
              <Text style={styles.text}>Followers: {igStats.followerCount?.toLocaleString()}</Text>
              <Text style={styles.text}>Following: {igStats.followingCount?.toLocaleString()}</Text>
              <Text style={styles.text}>Posts: {igStats.postsCount?.toLocaleString()}</Text>
            </View>
          )}
          {tkStats && (
            <View style={styles.statBox}>
              <Text style={styles.h3}>TikTok</Text>
              <Text style={styles.text}>Followers: {tkStats.followerCount?.toLocaleString()}</Text>
              <Text style={styles.text}>Hearts: {tkStats.heartCount?.toLocaleString()}</Text>
              <Text style={styles.text}>Videos: {tkStats.videoCount?.toLocaleString()}</Text>
            </View>
          )}
        </View>
        
        {/* Top Posts Section */}
        <View>
          <Text style={styles.h2}>Top Content</Text>
          <View style={styles.postGrid}>
            {igPosts?.map((post: any) => (
              <Link key={post.id} src={post.postUrl} style={styles.postImage}>
                <Image src={post.thumbnailUrl} />
              </Link>
            ))}
            {tkPosts?.map((post: any) => (
              <Link key={post.id} src={post.postUrl} style={styles.postImage}>
                <Image src={post.thumbnailUrl} />
              </Link>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate; 